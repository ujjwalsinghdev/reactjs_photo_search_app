import React from "react"

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    instagram_username,
    portfolio_url,
    profile_image: { medium }
  }
}) => {
  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <p> ❤️ {likes}</p>
          <p> 📘 {alt_description}</p>
          <p> 📸 {name}</p>
        </div>
        <div>
          <img src={medium} alt={name} className="user-img" />
          <a rel="noopener noreferrer" target={"_blank"} style={{ color: "#FFF" }} href={`https://instagram.com/${instagram_username}`}>
            @{instagram_username}
          </a>
        </div>
      </div>
    </article>
  )
}

export default Photo
