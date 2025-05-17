import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const {identifier, userPassword} = await req.json();
        
        if(!identifier || !userPassword){
            return NextResponse.json(
                {
                    error: "All fields are Required"
                },
                { status: 400 }
            )
        }
        
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier  },
                    {   email: identifier   }
                ],
            },
        });
        if(!user){
            throw new Error("User Does not exist");
        }

        const isPasswordCorrect = await bcrypt.compare(user.password, userPassword)
        if(!isPasswordCorrect){
            throw new Error("Invlaid Credentials");
        }

        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        console.log("Error", error);
        throw new Error("User Sign-In Failed");
    }

}