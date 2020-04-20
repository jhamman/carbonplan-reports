import Metric from './metric'
import Expander from './expander'
import Cycle from './graphics/cycle'
import { Badge, Link, Grid, Box, Divider, Heading, Text, IconButton } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useThemeUI } from 'theme-ui'

const Report = ({ project }) => {
  const id = project.id
  const visibility = useSelector(state => state.visibility[id])
  const [expanded, setExpanded] = useState(false)

  const context = useThemeUI()
  const theme = context.theme

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  const showMetrics = [
    'cost',
    'volume',
    'negativity',
    'permanence',
    'additionality'
  ]

  const metrics = showMetrics.map((metric) => {
    return project.metrics.filter((m) => m.name == metric)[0]
  })

  const cycle = project.metrics.filter((m) => m.name == 'volume')[0]['cycle']

  if (visibility) {
    return <Box sx={{ 
      borderStyle: 'solid',
      borderColor: 'muted',
      borderWidth: '0px', 
      borderBottomWidth: '1px',
      pr: [4],
      py: [4]
    }}>
      <Grid columns={[1, null, '1fr 300px']}>
        <Heading sx={{ mb: [2], fontSize: [4] }}>{project.name}</Heading>
        <Box sx={{ textAlign: ['left', null, 'right'] }}>
          {project.tags.map((tag) =>
            <Badge key={tag} variant='primary' sx={{ 
              borderColor: theme.tags[tag],
              color: theme.tags[tag],
              cursor: 'default',
              mr: [2],
              ml: [0, 0, 2]
            }}>
              {tag}
            </Badge>
          )}
        </Box>
      </Grid>
      <Grid columns={[1, null, '1fr 32px']}>
      <Text variant='description' sx={{ mb: [2] }}> 
        { project.description }
      </Text>
      <Box sx={{ ml: ['-5px', '-5px', '2px'] }}>
        <Expander toggle={toggle} expanded={expanded}></Expander>
      </Box>
      </Grid>
      <Box>
        {expanded && 
          <>
          <Divider sx={{ mr: [2] }}/>
          {metrics.map((metric) => 
            <Metric 
              key={metric.name} 
              tag={project.tags[0]}
              metric={metric}
            ></Metric>) }
          <Grid columns={[1, null, 2]}>
            <Box>
              <Text sx={{ color: 'secondary' }}>Source</Text>
              <Text>
                Stripe Decrement
                <Link variant='arrow' href={ project.source.url }>↗</Link>
              </Text>
            </Box>
            <Box sx={{ pr: [2], textAlign: ['left', 'left', 'right'] }}>
              <Text sx={{ color: 'secondary' }}>Location</Text>
              <Text>
                { project.location.name }
              </Text>
            </Box>
          </Grid>
          </>
        }
      </Box>
    </Box>
  } else {
    return null
  }
}

export default Report
