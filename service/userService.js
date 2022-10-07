const Model= require("../models")

exports.addUser=(data)=>{
    return Model.userModel.create(data)
}
exports.get=()=>{
    return Model.userModel.findAll({
        attributes: {
            exclude: ["userId","createdAt", "updatedAt"],
          },
    });
}
exports.gets=()=>{
    return Model.userModel.findAndCountAll({
        attributes: {
            exclude: ["userId","createdAt", "updatedAt"],
          },
    });
}

 