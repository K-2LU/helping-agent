import Otp from "#models/otp"
import User from "#models/user"
import { randomInt } from "crypto"
import { DateTime } from "luxon"

export class OtpService {
  async send(
    user: User,
    purpose: 'verification' | 'reset' = 'verification'):
    Promise<string> {

    await Otp.query()
      .where('user_id', user.id)
      .where('purpose', purpose)
      .delete();

    const code = randomInt(100000, 1000000).toString();

    await Otp.create({
      userId: user.id,
      otp: code,
      purpose: purpose,
      expiresAt: DateTime.now().plus({ minutes: 5 })
    });

    console.log(`\nSent to: ${user.phoneNumber} | OTP: ${code}`);

    return code;
  }

  async verify(
    user: User,
    code: string,
    purpose: 'verification' | 'reset'):
    Promise<boolean> {
      
    const record = await Otp.query()
      .where('user_id', user.id)
      .where('otp', code)
      .where('purpose', purpose)
      .first();

    if (!record) return false;
    if (record.expiresAt < DateTime.now()) return false;
    
    await record.delete();

    return true;
  }
}