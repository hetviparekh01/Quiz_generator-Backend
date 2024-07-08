import { Request, Response, NextFunction } from 'express';

export const roleVerify = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const role = (req.user as any).role;
            if (roles.includes(role)) {
                next();
            } else {
                return res.status(403).json({ status: false, content: "Unauthorized access" });
            }
        } catch (error:any) {
            return res.status(500).json({ status: false, content: error.message });
        }
    }
}
