/** @jsx jsx */
import { jsx, Box, Input } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'

const Search = () => {
  const dispatch = useDispatch()
  const input = useSelector((state) => state.search)

  const handleInputChange = (e) => {
    const searchTerm = e.currentTarget.value
    dispatch({ type: 'UPDATE_SEARCH', value: searchTerm })
  }

  return (
    <Box>
      <Input
        type='text'
        autoFocus='true'
        placeholder='search reports'
        onChange={handleInputChange}
        sx={{ pt: [2] }}
        value={input}
      />
    </Box>
  )
}

export default Search
