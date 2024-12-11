import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDTO } from 'src/dto/query-dto';
import { PrismaService } from 'src/prisma.service';
import { EditUserDTO } from './dto/edit-user.dto';
import { removeFile, saveFile } from 'src/utils/filehandler';
import { FormatResponse } from 'src/format-response.decorator';

@Injectable()
@FormatResponse()
export class UserService {
    constructor(private readonly prisma : PrismaService) {

    }

    async searchUser({
        limit = 10,
        page = 1,
        search
    } : QueryDTO) {
        const users = await this.prisma.user.findMany({
            where : {
                OR : [
                   
                    {
                        username : {
                            contains : search
                        }
                    }
                ]
            },
            take : limit,
            skip : (page - 1) * limit
        });

        return {
            data : users,
            count : await this.prisma.user.count({
                where : {
                    OR : [
                        {
                            username : {
                                contains : search
                            }
                        }
                    ]
                }
            })
        };
    }

    async getUserDetail(user_id : string) {
        const user = await this.prisma.user.findUnique({
            where : {
                uuid : user_id
            }
        })

        if(user == null) throw new NotFoundException("Tidak Menemukan User")

        return user
    }

    async deleteUser(user_id : string) {
        const user = await this.prisma.user.delete({
            where : {
                uuid : user_id
            }
        })

        return user
    }


    async editProfile(user_id : string, profile : EditUserDTO, gambar : Express.Multer.File ) {

        const user = await this.prisma.profile.findFirst({
            where : {
                user_id : user_id
            }
        })

        if(user == null) throw new NotFoundException("Tidak Menemukan User")
        if(gambar != null) {
            removeFile(user.foto_profile, "profile")
            saveFile(gambar, "profile")
        }

        await this.prisma.profile.update({
            where : {
                user_id : user_id
            },
            data : {
                nama : profile.nama,
                foto_profile : gambar != null ? gambar.originalname : user.foto_profile
            }
        })

        return {
            message : "Berhasil"
        }

    }
    




}
