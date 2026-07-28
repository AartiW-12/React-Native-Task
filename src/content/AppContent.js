
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getDoctors } from '../redux/doctors/doctorSlice'

const AppContent = () => {

    const disptach = useDispatch()

    useEffect(() => {
        disptach(getDoctors())
    }, [disptach])


    return (<>
    </>
    )
}

export default AppContent