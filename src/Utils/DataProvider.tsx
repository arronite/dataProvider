import ApiManager from "./apiManager"
import { useState, useEffect } from "react"

type dataProviderParams = {
    url: string,
    params: any
}

const useDataProvider = ({ url, params }: dataProviderParams) => {
    const [data, setData] = useState<JSON | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const api = new ApiManager()

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get(url, params)
            setData(response)
        } catch (err) {
            setError("Error fetching data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        reload()
    }, [params])


    const reload = (): void => {
        setData(null) // Optionally clear old data while reloading
        fetchData() // Re-fetch the data
    }

    // Function to set token for the API client
    const tokenHandler = (token: string) => {
        api.setToken(token)
    }

    return { data, loading, error, reload, tokenHandler }
}

export default useDataProvider
