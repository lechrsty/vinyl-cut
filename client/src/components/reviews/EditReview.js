import * as React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleReview, updateReview } from "../../managers/ReviewManager"
import { getGenres } from "../../managers/GenreManager"
import { getRatings } from "../../managers/RatingManager"

export const EditReview = () => {

    const navigate = useNavigate()
    const { reviewId } = useParams()

    // Initialize and set state for Review
    const [review, setReview] = useState({
        title: "",
        artist: "",
        description: "",
        genre: null,
        rating: null,
    })

    useEffect(
        () => { getSingleReview(reviewId).then(setReview) }, []
    )

    // Initialize and set state for Genre dropdown
    const [genreDropdown, setGenreDropdown] = useState([])

    useEffect(
        () => { getGenres().then(setGenreDropdown) }, []
    )

    // Initialize and set state for Rating
    const [ratingDropdown, setRatingDropdown] = useState([])

    useEffect(
        () => { getRatings().then(setRatingDropdown) }, []
    )


    const handleInputChange = (event) => {
        const copyOfReview = { ...review }
        copyOfReview[event.target.name] = event.target.value
        setReview(copyOfReview)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        updateReview(reviewId, review)
            .then(() => navigate(`/reviews`))
    }

    return (
        <>
            <main className='tasty-content-wrapper'>
                <h2 className='tasty-header'> Edit Review</h2>
            </main>

            <div className='edit-wrapper'>

                <div>
                    <label className="detail-artist padding-right-27 " htmlFor="title">Title </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={review.title}
                        onChange={handleInputChange}
                    />
                </div>


                <div>
                    <label className="detail-artist padding-right-10" htmlFor="artist">Artist </label>
                    <input type="text" name="artist" required autoFocus className="form-control"
                        defaultValue={review.artist}
                        onChange={handleInputChange}
                    />
                </div>


                <div>
                    <div className='space-above'></div>
                    <textarea
                        name="description"
                        id="description"
                        required
                        autoFocus
                        placeholder="A gut-wrenchingly honest opinion?"
                        defaultValue={review.description}
                        onChange={handleInputChange}
                    />
                </div>


                <div>
                    <div className='space-above'></div>
                    <label className="detail-artist" htmlFor="genre">Genre </label>
                    <select
                        className="form-style select-genre background-grey"
                        onChange={(evt) => {
                            const copy = { ...review };
                            copy.genre = { id: parseInt(evt.target.value) };
                            setReview(copy);
                        }}
                    >
                        <option value="">{review?.genre?.type}</option>
                        {genreDropdown.map((genre) => (
                            <option key={`genre--${genre.id}`} value={genre.id}>
                                {genre.type}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="detail-artist" htmlFor="rating">Rating </label>
                    <select
                        className="form-style select-rating background-grey"
                        value={review?.rating?.id}
                        onChange={(evt) => {
                            const copy = { ...review };
                            copy.rating = { id: parseInt(evt.target.value) };
                            setReview(copy);
                        }}
                    >
                        <option value="" disabled={!review?.rating}>
                            {review?.rating?.rating}
                        </option>
                        {ratingDropdown.map((rating) => (
                            <option key={`rating--${rating?.id}`} value={rating?.id}>
                                {rating?.rating}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='space-above'></div>
                <button type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </>
    )
}