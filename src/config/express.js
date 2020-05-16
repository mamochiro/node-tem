import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import routes from '../routes/v1'

/**
* Express instance
* @public
*/
const app = express()

// request logging. dev: console | production: file
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :user-agent :referrer :remote-addr'))

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// gzip compression
app.use(compress())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount api v1 routes
app.use('/api/v1', routes)

app.get('/healthz', (req, res) => res.status(200).send('OK'))

export default app
