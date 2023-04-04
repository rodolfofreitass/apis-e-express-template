import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//GET QUE RETORNA OS CURSOS

app.get('/courses', (req: Request, res: Response)=>{
    res.send(courses)
})

//GET QUE BUSCA UM CURSO PELO NOME

app.get('/courses/search', ( req: Request, res: Response)=>{
    const q = req.query.q as string
    const filteredCourses: TCourse[] = courses.filter((course)=>{
        if(q){
            return course.name.toLowerCase().includes(q.toLowerCase())
        }
        return course
    })
    res.status(200).send(filteredCourses)
})

// CRIAR CURSO

app.post('/courses', (req: Request, res: Response) => {
    const body = req.body
    const{id, name, lessons, stack } = body

    const newCourse:TCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)

    res.status(201).send("Curso adicionado com sucesso")
})

//CRIAR ESTUDANTE

app.post('/students', (req: Request, res: Response) => {
    const body = req.body
    const{id, name, age } = body

    const newStudent:TStudent = {
        id,
        name,
        age
    }

    students.push(newStudent)

    res.status(201).send("Esudante adicionado com sucesso")
})

//MOSTRAR TODOS OS ESTUDANTES

app.get('/students', (req: Request, res: Response)=>{
    res.send(students)
})