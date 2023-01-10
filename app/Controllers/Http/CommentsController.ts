import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

import Moment from "App/Models/Moment"

export default class CommentsController {

    public async store({request, params, response}: HttpContextContract){
        const body = request.body()
        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        body.momentId = momentId

        const comment = await Comment.create(body)

        response.status(201)

        return{
            message: 'Comentario adicionado com sucesso!',
            data: comment
        }
    }
    public async index({params}: HttpContextContract){
        const momentId = params.momentId
        await Moment.findOrFail(momentId)
        const comments = await Comment.query().where('moment_id', momentId)

        return{
            data:comments
        }
    }

    public async show({params}: HttpContextContract){
        const comment = await Comment.findOrFail(params.id);

        return{
            data: comment
        }
    }

    public async destroy({params}: HttpContextContract){
        const comment = await Comment.findOrFail(params.id)

        await comment.delete()

        return{
            message: "Comentario excluido com sucesso",
            data:comment
        }
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body()

        const comment = await Comment.findOrFail(params.id)

        comment.username = body.username
        comment.text = body.text

        await comment.save()

        return{
            message:"Comentário atualizado com sucesso!",
            data:comment
        }
    }
}
