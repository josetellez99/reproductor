import { Home } from './home/Home'
import { Player } from './player/Player'
import { useRoute } from './router'
import { SceneInspector } from './tester/SceneInspector'
import { TestGrid } from './tester/TestGrid'

export function App() {
  const route = useRoute()
  switch (route.name) {
    case 'play':
      return <Player index={route.index} />
    case 'test':
      return <TestGrid />
    case 'test-scene':
      return <SceneInspector index={route.index} />
    default:
      return <Home />
  }
}
