const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js')
const { z } = require('zod')
const express = require('express')

const startMcpServer = (todosApi) => {
  const server = new McpServer({ name: 'godo', version: '1.0.0' })

  server.tool('list-all-todos',
    'Todo 一覧を取得する',
    {},
    () => {
      const todos = todosApi.list()
      return { content: [{ type: 'text', text: JSON.stringify(todos) }] }
    }
  )

  server.tool('add-new-todo',
    'Todo を追加する',
    { title: z.string() },
    ({ title }) => {
      const newTodo = todosApi.add(title)
      return { content: [{ type: 'text', text: JSON.stringify({ newTodo }) }] }
    }
  )

  server.tool('complete-todo',
    'Todo を完了済みにする',
    { id: z.number() },
    ({ id }) => {
      todosApi.complete(id)
      return { content: [{ type: 'text', text: `Completed todo (id: ${id})` }] }
    }
  )

  const app = express()
  app.use(express.json())

  app.post('/mcp', async (req, res) => {
    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      })
      res.on('close', () => {
        transport.close()
        server.close()
      })
      await server.connect(transport)
      await transport.handleRequest(req, res, req.body)
    } catch (error) {
      console.error('Error handling MCP request:', error)
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        })
      }
    }
  })

  app.get('/mcp', (_req, res) => {
   res.writeHead(405).end(
     JSON.stringify({
       jsonrpc: '2.0',
       error: {
         code: -32000,
         message: 'Method not allowed.',
       },
       id: null,
     })
   )
  })

  app.delete('/mcp', (_req, res) => {
   res.writeHead(405).end(
     JSON.stringify({
       jsonrpc: '2.0',
       error: {
         code: -32000,
         message: 'Method not allowed.',
       },
       id: null,
     })
   )
  })

  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`MCP HTTP Server listening on port ${PORT}`)
  })
}

module.exports = { startMcpServer }

