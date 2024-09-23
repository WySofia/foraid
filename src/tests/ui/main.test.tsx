import { describe, it, expect, vi } from 'vitest'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

// Mock the createRoot function from react-dom/client
vi.mock('react-dom/client', () => ({
    createRoot: vi.fn(() => ({
        render: vi.fn(),
    })),
}))

describe('main.tsx', () => {
    it('should render the App component inside StrictMode', () => {
        const rootElement = document.createElement('div')
        rootElement.id = 'root'
        document.body.appendChild(rootElement)

        // Import the main file to trigger the rendering

        expect(createRoot).toHaveBeenCalledWith(rootElement)
        const mockRoot = createRoot(rootElement)
        expect(mockRoot.render).toHaveBeenCalledWith(
            <StrictMode>
                <App />
            </StrictMode>
        )
    })
})