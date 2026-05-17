type VerifyEmailTemplateProps = {
    username: string;
    verificationLink: string;
};

const verifyEmailTemplate = ({
    username,
    verificationLink
}: VerifyEmailTemplateProps) => {

    return `
        <div
            style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
            "
        >

            <h2>Email Verification</h2>

            <p>Hello ${username},</p>

            <p>
                Please verify your email by clicking
                the button below.
            </p>

            <a
                href="${verificationLink}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#000;
                    color:#fff;
                    text-decoration:none;
                    border-radius:6px;
                    margin-top:10px;
                "
            >
                Verify Email
            </a>

            <p
                style="
                    margin-top:20px;
                    color:#666;
                    font-size:14px;
                "
            >
                This link expires in 24 hours.
            </p>

        </div>
    `;
};

export default verifyEmailTemplate;