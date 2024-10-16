import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
    
const prisma = new PrismaClient();

const saltRounds = 14;
    
async function main() {

    await prisma.language.create({
        data: {
            name: "C",
            htmlClass: "language-c",
            logo: "devicon-c-plain",
        }
    })

    await prisma.language.create({
        data: {
            name: "HTML",
            htmlClass: "language-html",
            logo: "devicon-html5-plain",
        }
    })

    await prisma.user.create({
        data: {
            name: "fay0026",
            hashedPassword: await bcrypt.hash('azerty', saltRounds)
        }
    })

    await prisma.user.create({
        data: {
            name: "bob",
            hashedPassword: await bcrypt.hash('qsdfgh', saltRounds)
        }
    })

    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            code:`
main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
            language: {
                connect: { name: "C" }
            },
            author: {
                connect: { name: "bob" }
            }
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            code: 
`<script>window.alert("Injection !")</script>`,
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.',
            language: {
                connect: { name: "HTML" }
            },
            author: {
                connect: { name: "fay0026" }
            }
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Exemple d\'utilisation de l\'attribut HTML download',
            code: 
`<a href="/images/myw3schoolsimage.jpg" download>`,
            creationDate: new Date(2023, 10, 9, 14, 50, 0),
            description: "L'attribut permet d'associer à une balise contenant l'attribut \"href\", un téléchargement du lien.",
            language: {
                connect: { name: "HTML" }
            },
            author: {
                connect: { name: "fay0026" }
            }
        }
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});