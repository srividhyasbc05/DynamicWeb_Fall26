import { useContext } from 'react'
import WorkspaceContext from './workspace'

const useWorkspaceContext = () => useContext(WorkspaceContext)
export default useWorkspaceContext