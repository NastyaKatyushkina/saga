export const fetchAPI = async (id = null) => {
  const response = await fetch(
    !id
      ? process.env.REACT_APP_SERVICES_URL
      : `${process.env.REACT_APP_SERVICES_URL}/${id}`
  )
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}
