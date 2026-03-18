export const loadData = async <T> (path: string): Promise<T> => {
    const response = await fetch(path, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`)
    }

    return await response.json() as T
}