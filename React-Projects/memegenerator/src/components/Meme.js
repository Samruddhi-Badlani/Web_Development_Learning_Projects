import React from "react"


export default function Meme() {


    // const [memeImage , setMemeImage] = React.useState("");

    // let url ;

   

   
    const [meme,setMeme] = React.useState(
        {
            topText : "",
            bottomText : "",
            randomImage : "http://i.imgflip.com/1bij.jpg"
        }
    );
    const [allMemeImages,setAllMemeImages] = React.useState([]);

    React.useEffect(()=>{

        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data=> setAllMemeImages(data.data.memes));

    },[])

    console.log(allMemeImages)

     function getMemeImage(){
        
        const randomNumber = Math.floor(Math.random() *allMemeImages.length);
        console.log(randomNumber);
        const url = allMemeImages[randomNumber].url;
        setMeme(prevMeme => {
            return {
            ...prevMeme,
            randomImage: url
            }
        })
    }

    function handleChange(event){
        const {name,value} = event.target;

        console.log(name,value)
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }
  
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}


                   
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}

                   
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                   
                >
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}