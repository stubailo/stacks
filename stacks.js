Stacks = new Mongo.Collection("stacks");
Items = new Mongo.Collection("items");

if (Meteor.isClient) {
  Template.body.helpers({
    stacks: function () {
      return Stacks.find();
    }
  });

  Template.body.events({
    "click .js-new-stack": function () {
      Stacks.insert({
        userId: "test",
        name: "Test Stack",
        query: "#meteorjs"
      });
    }
  });

  Template.stack.helpers({
    items: function () {
      return Items.find({stackId: this._id});
    },
    flippedClass: function () {
      if (Session.get("flippedStack") === this._id) {
        return "flipped";
      }
    }
  });

  Template.stack.events({
    "click .js-delete-stack": function () {
      Stacks.remove({_id: this._id});
    },
    "click .js-new-item": function () {
      Items.insert({
        stackId: this._id,
        createdAt: new Date()
      });
    },
    "click .js-stack-poll": function () {
      Meteor.call("updateTwitterStack", this._id);
    },
    "click .js-flip": function () {
      if (Session.get("flippedStack") !== this._id) {
        Session.set("flippedStack", this._id);
      } else {
        Session.set("flippedStack", null);
      }
    }
  });
}
