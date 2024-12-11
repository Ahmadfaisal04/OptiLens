import { Injectable } from '@nestjs/common';
import { QueryDTO } from 'src/dto/query-dto';
import { PrismaService } from 'src/prisma.service';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { removeFile, saveFile } from 'src/utils/filehandler';
import { CatchPrismaError } from 'src/error-catch.decorator';
import { FormatResponse } from 'src/format-response.decorator';

@Injectable()
@CatchPrismaError()
export class ArtikelService {
    constructor(private readonly prisma : PrismaService) {}

    async getArtikel( {
        limit = 10,
        page = 1,
        search = ""
    } : QueryDTO) {
        const result = await this.prisma.artikel.findMany({
            where : {
                judul : {
                    contains : search
                }
            },
            skip : limit * (page - 1),
            take : limit,
            orderBy : {
                createdAt : "desc"
            },
            select : {
                judul : true,
                id : true,
                updatedAt : true,
                createdAt : true,
                gambar : true
            }
        })

        return {
            data : result,
            count : await this.prisma.artikel.count()
        }
    }

    async getArtikelDetail(id_artikel : number) {
        return this.prisma.artikel.findUnique({
            where : {
                id : id_artikel
            }
        })
    }

    async createArtikel(data : CreateArtikelDto, file? : Express.Multer.File) {
        
        if(file != null) {
            const filename = saveFile(file, "artikel")
            data.gambar = filename
        }

        const result = await this.prisma.artikel.create({
            data
        })

        return result
    }

    async updateArtikel(id_artikel : number, data : CreateArtikelDto, file? : Express.Multer.File) {
        const artikel = await this.prisma.artikel.findUnique({
            where : {
                id : id_artikel
            }
        })
        if(file != null) {
            removeFile(artikel.gambar, "artikel")
            const filename = saveFile(file, "artikel")
            data.gambar = filename
        }

        const result = await this.prisma.artikel.update({
            where : {
                id : id_artikel
            },
            data
        })

        return result
    }

    async removeArtikel(id_artikel : number) {
        const artikel = await this.prisma.artikel.findUnique({
            where : {
                id : id_artikel
            }
        })
        removeFile(artikel.gambar, "artikel")
        return this.prisma.artikel.delete({
            where : {
                id : id_artikel
            }
        })
    }

    async getArtikelGambar(id_artikel : number) {
        const artikel = await this.prisma.artikel.findUnique({
            where : {
                id : id_artikel
            },
            select : {
                gambar : true
            }
        })

        return artikel.gambar
    }






}
