App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() { 
    return App.initWeb3();
  },

  initWeb3: function() {
    
    if (typeof web3 !== 'undefined') {
      
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else { 
      
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      
      App.contracts.Election = TruffleContract(election);
      
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
    
        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        console.log(account);
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    var countDownDate = new Date("Jun 19, 2021 05:45:45").getTime();

    var x = setInterval(function() {

    var now = new Date().getTime();
    
    var distance = countDownDate - now;
      
    
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    $("#timer").html(hours + " : "+ minutes + " : " + seconds);

      if (distance < 0) {
        clearInterval(x);
        $("#timer").html("Voting lines are closed");
        $('form').hide();
        // $("#accountAddress").hide();
        App.contracts.Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.candidatesCount();
        }).then(function(candidatesCount) {
          for (var i = 1; i <= candidatesCount; i++) {
            electionInstance.candidates(1).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];

              $("#result1").html("Total votes : "+voteCount);
              // $("#result2").html("No. of Votes: "+voteCount);
              // $("#result3").html("No. of Votes: "+voteCount);
            });
            electionInstance.candidates(2).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];

              $("#result2").html("Total votes : "+voteCount);
              // $("#result2").html("No. of Votes: "+voteCount);
              // $("#result3").html("No. of Votes: "+voteCount);
            });
            electionInstance.candidates(3).then(function(candidate) {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];

              $("#result3").html("Total votes : "+voteCount);
              // $("#result2").html("No. of Votes: "+voteCount);
              // $("#result3").html("No. of Votes: "+voteCount);
            });
          }
       });
      }
    }, 1000);
    // if(web3.currentProvider.enable){
    //   //For metamask
    //   web3.currentProvider.enable().then(function(acc){
    //       App.account = acc[0];
    //       console.log(acc);
    //       $("#accountAddress").html("Your Account: " + App.account);
    //   });
    //   } else{
    //     App.account = web3.eth.accounts[0];
    //     $("#accountAddress").html("Your Account: " + App.account);
    //   }
  
    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      if(hasVoted) {
        $('form').hide();
        $('#accountAddress').html("You have already voted!");
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
