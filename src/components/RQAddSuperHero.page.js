import { useState } from 'react'
import { useAddSuperHeroData } from '../hooks/useSuperHeroData'

export const RQAddSuperHeroPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')
  const { mutate } = useAddSuperHeroData()
  const handleAddSuperHeroClick = () => {
    const hero = { name, alterEgo }
    console.log(hero)
    mutate(hero)
  }

  return (
    <div>
      <h2>Add Super Hero</h2>
      <div>
        <label htmlFor='name'>Name </label>
        <input
          id='name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='alterEgo'>Alter Ego </label>
        <input
          id='alterEgo'
          name='alterEgo'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
      </div>
      <button style={{ marginLeft: '120px' }} onClick={handleAddSuperHeroClick}>
        Add
      </button>
    </div>
  )
}
