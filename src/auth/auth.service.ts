import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';

@Injectable({})
export class AuthService {
  signup() {
    return { success: true, message: 'Signed up' };
  }

  signin() {
    return { success: true, message: 'Signed in' };
  }
}
