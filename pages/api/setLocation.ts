// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const session = await getServerSession(req, res, {
			...authOptions,
			session: { strategy: "jwt" },
		});

		if (!session) {
			res.status(401).json({ message: "You must be logged in." });
		}

		console.log(req.body);

		await prisma.user.update({
			where: { email: session?.user?.email! },
			data: {
				location: req.body.location,
			},
		});

		res.status(200).json({ message: "User updated" });
	}
}
