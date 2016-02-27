var sessionModel = require('../models/sessionModel.js');

/**
* sessionController.js
*
* @description :: Server-side logic for managing sessions.
*/
module.exports = {
  
  /**
  * sessionController.list()
  */
  list: function(req, res) {
    sessionModel.find(function(err, sessions){
      if(err) {
        return res.json(500, {
          message: 'Error getting session.'
        });
      }
      return res.json(sessions);
    });
  },
  
  /**
  * sessionController.show()
  */
  show: function(req, res) {
    var id = req.params.id;
    sessionModel.findOne({_id: id}, function(err, session){
      if(err) {
        return res.json(500, {
          message: 'Error getting session.'
        });
      }
      if(!session) {
        return res.json(404, {
          message: 'No such session'
        });
      }
      return res.json(session);
    });
  },
  
  /**
  * sessionController.create()
  */
  create: function(req, res) {
    var session = new sessionModel({
    });
    
    session.save(function(err, session){
      if(err) {
        return res.json(500, {
          message: 'Error saving session',
          error: err
        });
      }
      return res.json({
        message: 'saved',
        _id: session._id
      });
    });
  },
  
  /**
  * sessionController.update()
  */
  update: function(req, res) {
    var id = req.params.id;
    sessionModel.findOne({_id: id}, function(err, session){
      if(err) {
        return res.json(500, {
          message: 'Error saving session',
          error: err
        });
      }
      if(!session) {
        return res.json(404, {
          message: 'No such session'
        });
      }
      
      session.start_date =  req.body.start_date ? req.body.start_date : session.start_date;
      session.save(function(err, session){
        if(err) {
          return res.json(500, {
            message: 'Error getting session.'
          });
        }
        if(!session) {
          return res.json(404, {
            message: 'No such session'
          });
        }
        return res.json(session);
      });
    });
  },
  
  /**
  * sessionController.remove()
  */
  remove: function(req, res) {
    var id = req.params.id;
    sessionModel.findByIdAndRemove(id, function(err, session){
      if(err) {
        return res.json(500, {
          message: 'Error getting session.'
        });
      }
      return res.json(session);
    });
  }
};