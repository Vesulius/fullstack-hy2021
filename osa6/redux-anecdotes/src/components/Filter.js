import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input name="filter" onChange={changeFilter} />
    </div>
  )
}

export default Filter