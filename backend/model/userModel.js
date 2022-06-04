const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        fname:{type:String,required:true,trim:true},
        lname:{type:String,required:true,trim:true},
        title:{type:String,required:true,enum:["Mr","Miss","Mrs"],trim:true},
        email:{type:String,lowercase:true,validate:{
            validator:function(v){
                return /^\w+([\.-])*@\w+([\.-])*(\.\w{2,3})+$/.test(v);
            },
            Message:"please enter valid email",
        },
        required:[true,"email required"]
    },
    password:{type:String,required:true,minlength:5,maxlength:12}
    },
    {timestamps:true}
);

module.exports = mongoose.model("user",userSchema);