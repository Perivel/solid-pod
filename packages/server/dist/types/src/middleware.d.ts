import { Request, Response, NextFunction } from 'express';
/**
 * Middleware
 *
 * Solidus Middleware.
 */
export declare type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
