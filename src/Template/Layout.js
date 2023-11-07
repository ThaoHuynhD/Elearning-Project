import React from 'react'
import UserHeader from '../Components/UserHeader/UserHeader'
import UserFooter from '../Components/UserFooter/UserFooter'

export default function Layout({ children }) {
    return (
        <>
            <UserHeader />
            {children}
            <UserFooter />
        </>
    )
}
