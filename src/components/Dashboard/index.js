'use client'
import { GlobalContext } from "@/context/context"

export const DashboardView = () => {
    const { isAdmin, isArtist } = GlobalContext()
    return(<div className="mt-32 bg-red-300">{isAdmin && <p>admin</p>} {isArtist && <p>he is also artist</p>}</div>)
}