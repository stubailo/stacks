Meteor.methods({
  updateTwitterStack: function (stackId) {
    var stack = Stacks.findOne({_id: stackId});

    Items.remove({stackId: stackId});

    this.unblock();

    var twitter = new TwitterApi();
    var result = twitter.search(stack.query);

    _.each(result.data.statuses, function (status) {
      var data = {
        source: "twitter",
        sourceData: status,
        retrievedAt: new Date(),
        stackId: stackId
      };

      var twitterSpecificData = {
        // no title
        content: status.text,
        participants: [status.user.screen_name]
      };

      _.extend(data, twitterSpecificData);

      Items.insert(data);
    });
  }
});
