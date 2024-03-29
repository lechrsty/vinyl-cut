import { Outlet, Route, Routes } from "react-router-dom"
import { EditReview } from "../components/reviews/EditReview"
import { LoggedInProfile } from "../components/profiles/LoggedInProfile"
import { MemberProfile } from "../components/profiles/MemberProfile"
import { CommentListContainer } from "../components/comments/CommentContainer"
import { ClassicsAlbumList } from "../components/albums/ClassicsAlbumList"
import { EssentialsAlbumList } from "../components/albums/EssentialsAlbumList"
import { WorldAlbumList } from "../components/albums/WorldAlbumList"
import { HipHopAlbumList } from "../components/albums/HipHopAlbumList"
import { HighVoltageAlbumList } from "../components/albums/HighVoltageAlbumList"
import { NewReleasesAlbumList } from "../components/albums/NewReleasesAlbumList"
import { MemberDashboardContainer } from "../components/dashboard/member/MemberDashboardContainer"
import { AlbumDetails } from "../components/albums/AlbumDetails"
import { ReviewContainer } from "../components/reviews/ReviewContainer"
import { ReviewDetailsContainer } from "../components/reviews/ReviewDetailsContainer"

export const MemberViews = () => {

    return (
        <Routes>
            <Route path="/" element={<MemberDashboardContainer />} />

            <Route path="/dashboard" element={<MemberDashboardContainer />} />

            <Route path="/1" element={<ClassicsAlbumList />} />
            <Route path="/2" element={<EssentialsAlbumList />} />
            <Route path="/3" element={<WorldAlbumList />} />
            <Route path="/4" element={<HipHopAlbumList />} />
            <Route path="/5" element={<HighVoltageAlbumList />} />
            <Route path="/6" element={<NewReleasesAlbumList />} />

            <Route path="/reviews">
                <Route index element={<ReviewContainer />} />
                <Route path=":reviewId" element={<ReviewDetailsContainer />} />
                <Route path="edit/:reviewId" element={<EditReview />} />
                <Route path=":reviewId/comments" element={< CommentListContainer />} />
            </Route>

            <Route path="/profile">
                <Route index element={<LoggedInProfile />} />
                <Route path="member/:memberId" element={<MemberProfile />} />
            </Route>

            <Route path="/albums/:albumId" element={<AlbumDetails />} />

            </Routes >
    )
}