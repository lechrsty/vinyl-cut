import * as React from 'react'
import { useEffect, useState } from 'react'
import { getMemberById } from '../../../managers/MemberManager'
import { getTastes, updateTaste } from '../../../managers/TasteManager'
import { updateMember } from "../../../managers/MemberManager"
import { EditTaste } from './EditTaste'
import "../Dashboard.css"
import '../../../VinylCut.css'

export const MemberTaste = () => {

  // Initialize and state for logged in Member
  const [member, setMember] = useState(null)

  useEffect(() => {
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    if (vinylCutUserObject) {
      getMemberById(vinylCutUserObject.member).then((memberData) => {
        setMember(memberData)

        // Initialize and set state for Member to update Taste, and set current Taste so Member can see what they have selected before change
        getTastes().then((tastesData) => {
          const currentTaste = tastesData.find(taste => taste.id === memberData.taste.id)
          setTasteDropdown([currentTaste, ...tastesData.filter(taste => taste.id !== memberData.taste.id)])
        })
      })
    }
  }, [])

  const [tasteDropdown, setTasteDropdown] = useState([])

  // PUT request to update Member's Taste
  const handleTasteUpdate = (memberId, newTaste) => {
    updateTaste(memberId, newTaste)
      .then(() => {
        getMemberById(memberId).then((memberData) => {
          setMember(memberData)
        })
      })
  }

  // Get the first name of the member
  const firstName = member?.full_name.split(" ")[0]

  return (
    <>
      {member ? (
        <>
          {/* <h1 >Welcome back, {firstName}!</h1> */}

          <div >
            <EditTaste
              memberId={member.id}
              currentTaste={member.taste}
              tasteDropdown={tasteDropdown}
              onUpdate={handleTasteUpdate}
            />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}