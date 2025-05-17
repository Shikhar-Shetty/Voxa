import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {username, password, email} = body;

        if(!username || !password || !email){
            return NextResponse.json(
                {
                    error: "All fields are Required"
                },
                { status: 400 }
            )
        }

        const nEmail = email.toLowerCase();
        const nUsername = username.toLowerCase();

        const existingUsername = await prisma.user.findUnique({
            where: {username: nUsername}
        })

        const existingEmail = await prisma.user.findUnique({
            where: {
                email: nEmail
            }
        })
        
        if(existingEmail){
            throw new Error(
                "Error: Email already exists"
            )
        }
        if(existingUsername){
            throw new Error(
                "Error: Username already exists"
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: nEmail,
                username: nUsername,
                password: hashedPassword
            }
        })

        console.log(user);
        
        return NextResponse.json(
            {
                message: "User Created Successfully",
                user
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error:", error);
        
        return NextResponse.json({
            error: "Something went worng while Sign-up"
        },
        {status: 400})

    }
}