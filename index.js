const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, function() {
    console.log("Server started on port " + port);
  });
  
//Only for testing (check if the env variables were correctly set):
console.log("DB_USER: " + process.env.DB_USER);
console.log("DB_PASSWORD: " + process.env.DB_PASSWORD);

//Database (MongoDB Atlas)
const url_db = "mongodb+srv://"+ process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0.s3n7p.mongodb.net/wikiDB";
mongoose.connect(url_db, { useNewUrlParser: true }).
    catch(error => console.log(error));


const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model ("Article", articleSchema);

////////////// Requests for a ALL articles //////////////////////////////////////

app.route("/articles")

    .get(function(req, res) {

        Article.find(function(err, foundArticles) {
            if(!err) {
                //console.log(foundArticles);
                res.send(foundArticles);
            }
            else {
                res.send(err);
            }        
        });
    })

    .post(function(req, res) {
        console.log(req.body.title);
        console.log(req.body.content);
    
        const newArt = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArt.save(function(err) {
            if(!err) {
                res.send("Sucessfully added a new article");
            } else {
                res.send(err);
            }
        });
    })
    
    .delete(function(req, res) {

        Article.deleteMany(function(err) {
            if(!err) {
                res.send("Sucessfully deleted all articles");
            } else {
                res.send(err);
            }
        });    
    });



////////////// Requests for a SPECIFIC article //////////////////////////////////////

//Route parameters
app.route("/articles/:articleTitle")

    .get(function(req, res) {

        const articleTitle = req.params.articleTitle; //lodash.lowerCase(req.params.postName);

        console.log(articleTitle);

        Article.findOne({title: articleTitle}, function(err, foundArticle) {
            if(!err) {
                if(foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("Article not found!");
                }                
            }
            else {
                res.send("Erro!!!:" +err);
            }        
        });
    })

    .put(function(req, res) {

        const articleTitle = req.params.articleTitle;

        console.log(articleTitle);
        console.log(req.body);
        console.log(req.params);

        Article.updateOne(
            {title: articleTitle}, 
            req.body,
            function(err, opResult) {
                if(!err)  {
                    if(opResult.matchedCount > 0) {
                        res.send("Successfully updated article") ;               
                    } 
                    else {
                        res.send("Update failed - Article title not found") ;               
                    }                                        
                }else {
                    res.send("err: " + err);  
                }
            });
    })

/*     .patch(function(req,res) {
        const articleTitle = req.params.articleTitle;
        
        Article.updateOne(
            {title: articleTitle},
            //{$set: req.body},
            req.body,
            function(err, opResult) {
                if(!err)  {
                    res.send("Successfully updated article") ;       
                }else {
                    res.send("err: " + err);  
                }
            });
    }) */

    .delete(function(req,res) {
        const articleTitle = req.params.articleTitle;
        
        Article.deleteOne(
            {title: articleTitle},
            function(err, opResult) {
                if(!err)  {
                    console.log(opResult);
                    if(opResult.deletedCount > 0) {
                        res.send("Successfully deleted article") ;               
                    } 
                    else {
                        res.send("Delete failed - Article title not found") ;               
                    }                                        
                }else {
                    res.send("err: " + err);  
                }
            });
    })
