(function(){dust.register("li_auth",body_0);function body_0(chk,ctx){return chk.write("Welcome ").reference(ctx.get("first_name"),ctx,"h").write("! Now please login with your Stack Exchange account to link it to your LinkedIn account.<a href=\"https://stackexchange.com/oauth/dialog?client_id=").reference(ctx.get("client_id"),ctx,"h").write("&scope=no_expiry&redirect_uri=").reference(ctx.get("redirect_url"),ctx,"h").write("\">Login with Stack Exchange</a>");}return body_0;})();