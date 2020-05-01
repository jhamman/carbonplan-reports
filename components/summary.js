/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box, Heading, Select } from 'theme-ui'
import Volume from './charts/volume.js'
import Permanence from './charts/permanence.js'
import Negativity from './charts/negativity.js'
import Cost from './charts/cost.js'
import { useState } from 'react'

const Summary = ( props ) => {

  const [chart, setChart] = useState('VOLUME');

  return (
    <Box sx={{ height: '350px', px: [4], pt: [3] }}>
      <Box>
      <select
        onChange={e => {
          setChart(e.target.value)
        }}
        sx={{
          variant: 'forms.select'
        }}
        defaultValue={chart}>
        <option>VOLUME</option>
        <option>PERMANENCE</option>
        <option>NEGATIVITY</option>
        <option>COST</option>
      </select>
      <span sx={{ 
        ml: ['-15px'], 
        fontSize: [4], 
        display: 'inline-block', 
        transform: 'rotate(90deg)',
        pointerEvents: 'none',
        position: 'relative',
        top: '3px',
        color: 'secondary'
      }}>-></span>
      </Box>
      {(chart == 'VOLUME') && <Volume projects={props.projects}> </Volume>}
      {(chart == 'PERMANENCE') && <Permanence projects={props.projects}> </Permanence>}
      {(chart == 'NEGATIVITY') && <Negativity projects={props.projects}> </Negativity>}
      {(chart == 'COST') && <Cost projects={props.projects}> </Cost>}
    </Box>
  )
}

export default Summary
