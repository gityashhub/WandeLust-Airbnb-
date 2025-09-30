const User = require("../models/user.js");



module.exports.signup=async (req, res) => {
    try {
        let {username , email , password, role}=req.body;
        const newUser = new User({ username, email, role: role || 'customer' });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, function(err) {
            if (err) { return next(err); }
            req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
        });
        console.log(registeredUser);
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.login=async(req, res) => {
    req.flash("success", " Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    
    res.redirect(redirectUrl);

}

module.exports.logout=(req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged Out, visit again!");
        res.redirect("/listings");
      });
}