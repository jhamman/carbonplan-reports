/** @jsx jsx */
import _ from 'lodash'
import { jsx, Box, Text } from 'theme-ui'
import { Vega } from 'react-vega'
import { useThemeUI } from 'theme-ui'
import { useDispatch, useSelector } from 'react-redux'
import { config, signals } from './utils.js'

var vegaLite = require('vega-lite')

const Negativity = (props) => {
  const { projects } = props
  const dispatch = useDispatch()
  const context = useThemeUI()
  const theme = context.theme

  var values = []
  let opacity
  for (var i = 0; i < projects.length; i++) {
    const visible = useSelector((state) => state.visibility[projects[i].id])

    if (visible) {
      opacity = 0.85
    } else {
      opacity = 0.2
    }

    values.push({
      negativity: parseFloat(
        projects[i].metrics.filter((m) => m.name == 'negativity')[0].value
      ),
      group: projects[i].tags[0],
      color: theme.colors[theme.tags[projects[i].tags[0]]],
      name: projects[i].name,
      id: projects[i].id,
      opacity: opacity,
    })
  }

  const spec = {
    data: {
      name: 'values',
    },
    mark: {
      type: 'circle',
      size: 200,
      cursor: 'pointer',
    },
    selection: {
      highlight: { type: 'single', on: 'mouseover' },
    },
    encoding: {
      y: {
        field: 'group',
        type: 'nominal',
        scale: { padding: 1.87 },
        axis: { title: 'CATEGORY', domain: false, labels: false, ticks: false },
      },
      x: {
        field: 'negativity',
        type: 'quantitative',
        axis: { title: 'NEGATIVITY', tickCount: 2 },
        scale: { type: 'linear', domain: [-0.1, 1.1], nice: false },
      },
      color: {
        field: 'color',
        type: 'ordinal',
        scale: null,
      },
      opacity: {
        value: 1,
        condition: {
          selection: {
            not: 'highlight',
          },
          field: 'opacity',
          type: 'quantitative',
          scale: null,
        },
      },
      size: {
        condition: {
          selection: {
            not: 'highlight',
          },
          value: 200,
        },
        value: 285,
      },
    },
  }

  var vgSpec = vegaLite.compile(spec, { config: config(theme) }).spec

  vgSpec.signals.push(...signals)

  const width = 335
  const height = 175

  function handleClickOn(...args) {
    dispatch({ type: 'UPDATE_SEARCH', value: args[1].datum.id })
  }

  function handleClickOr(...args) {
    dispatch({ type: 'OR_SEARCH', value: args[1].datum.id })
  }

  function handleClickOff(...args) {
    dispatch({ type: 'UPDATE_SEARCH', value: '' })
  }

  const signalListeners = {
    clickOn: handleClickOn,
    clickOr: handleClickOr,
    clickOff: handleClickOff,
  }

  return (
    <>
      <Box sx={{ height: height + 25 + 60 + 4 }}>
        <Vega
          width={width}
          height={height}
          signalListeners={signalListeners}
          data={{ values: values }}
          renderer={'svg'}
          actions={false}
          spec={vgSpec}
        />
      </Box>
      <Text sx={{ maxWidth: '420px', fontSize: [0] }}>
        Projects by categories as a function of negativity, defined as 1 minus
        the ratio of gross project emissions to gross climate benefits.
      </Text>
    </>
  )
}

export default Negativity
