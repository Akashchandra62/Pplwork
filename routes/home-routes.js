const route = require("express").Router();
const { json } = require("express/lib/response");
const User = require("../model/user")

route.get("/", async (req, res) => {
    const users = await User.find();
    res.render("home", { users })
});

route.get("/user", async (req, res) => {
    const users = await User.find();
    res.json(users);
})
route.get("/edit/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({ "user": user })

})


route.post("/register", async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const update = await User.findByIdAndUpdate(user._id, { name, email });
        res.json({ "message": "success" });
    }
    else {
        const n = await (await User.find()).length;
        // let id= JSON.stringify('EP2022' + (n+1).toString());
        let id = 'EP2022' + (n + 1).toString();
        const newUser = await User.create({ name, email, id });

        res.json({ "message": "success" });
    }

})



module.exports = route;