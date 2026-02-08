import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from '@langchain/openai';

@Injectable()
export class EmbeddingsService {
    private embeddings: OpenAIEmbeddings;

    constructor(private configService: ConfigService) {
        this.embeddings = new OpenAIEmbeddings({
            openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
        });
    }

    getEmbeddings() {
        return this.embeddings;
    }
}

