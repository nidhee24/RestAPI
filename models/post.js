const  axios  = require("axios");


const getPosts = (req,res) => {
    //console.log(req.query);
    const { tags, sortBy, direction} = req.query;
   
    /* undefined is used in SortByDetails and DirectByDetails because it is optional */
    const SortByDetails = [undefined, 'id', 'reads', 'likes', 'popularity'];
    const DirecByDetails = [undefined, 'desc', 'asc'];

    if(!tags){
        res.status(400).send({
            error : 'Tags is mandatory',  //Error handling for tag if not input by user as it is compulsory
        })
    }

    if (tags.indexOf(',') !== -1 ){ // if statement is for when user input more than one tag like tech,history,startups.
        let tagData = tags.split(',');
        let gettagData = tagData.map((tag) => {
            return axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}?&direction=${direction}?`);
        });

        /* There are 9 possibility for tags as in post API of hatchways there are 9 tags like tech, 
        health, startups, history, design, culture, politics, science, design  and it is required to have 
        tags parameter congruent*/

        axios.all([
            ...gettagData
        ]).then(axios.spread((tag1,tag2,tag3,tag4,tag5,tag6,tag7,tag8,tag9) => {
            let details = [
                tag1 ? tag1.data.posts : '', 
                tag2 ? tag2.data.posts : '' ,
                tag3 ? tag3.data.posts : '',
                tag4 ? tag4.data.posts : '' ,
                tag5 ? tag5.data.posts : '', 
                tag6 ? tag6.data.posts : '',
                tag7 ? tag7.data.posts : '', 
                tag8 ? tag8.data.posts : '',
                tag9 ? tag9.data.posts : '',
            ]
            let rest = {};
            let posts = [];

            for(let i=0; i<details.length; i++){
                let post = details[i];
                for(let i=0; i<post.length; i++){
                    rest[post[i].id] = post[i];
                }
            }
            // Used key and push tag to hash table so that there should not be any redundant values
            for(let k in rest){
                posts.push(rest[k]);
            }
            
            if(sortBy){
                if(direction === 'desc'){
                    posts = posts.sort((valuea, valueb) => (valueb[sortBy] > valuea[sortBy]) ? 1 : -1);
                } else {
                    posts = posts.sort((valuea, valueb) => (valueb[sortBy] < valuea[sortBy]) ? 1 : -1);
                }
            }
            res.status(200).send(posts);
        }))
    }
    else { // But when user input only one tag than the following else statements would execute
        axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
        .then(request => {
            let details = request.details.posts;
            if(sortBy){
                if(direction === 'desc'){
                    details = details.sort((valuea, valueb) => (valueb[sortBy] > valuea[sortBy]) ? 1 : -1);
                } else {
                    details = details.sort((valuea, valueb) => (valueb[sortBy] < valuea[sortBy]) ? 1 : -1);
                }
            }
            res.status(200).send(details);
        }).catch(e => {
            res.status(400).send({
                error: 'Tags are mandatory', // Error Responses requirement for tag
            })
            console.log(e);
        });
    }

    if(SortByDetails.indexOf(sortBy) == -1){
        res.status(400).send({
            error: "Invalid SortBy paramter",
        })
    }

    if(DirecByDetails.indexOf(direction) == -1){
        res.status(400).send({
            error: "Invalid Direction parameter",
        });
    }
}

module.exports = {getPosts}
