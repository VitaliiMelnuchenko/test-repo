module.exports = {
    MIN_LENGTH: 3, 
    MAX_TITLE_LENGTH: 100, 
    MAX_DESC_LENGTH: 500, 
    MAX_TOPIC_LENGTH: 20,
    MAX_COMMENT_LENGTH: 500,
    inviteReviewerMail: (email, code) => {
        return {
            from: 'TechMagic',
            to: email,
            subject: `Reviewer invite`,
            html: `
                <h1>Hello!</h1>
                <h2 style="color: dodgerblue">Follow the link bellow to activate your account:</h2>
                <a href="http://recruiter-dev.surge.sh/${code}">http://recruiter-dev.surge.sh/${code}</a>
                <br>
                <br>
                <a href="http://localhost:4200/${code}">http://localhost:4200/${code}</a>
                <br>
                <br>
                <h3>
                    Thanks!
                </h3>
                <h4>The screaming tool team</h4>
            `
        }
    },
    inviteCandidateMail: (email, code, vacancy) => {
        return {
            from: 'TechMagic',
            to: email,
            subject: `You are invited on position ${vacancy}`,
            html: `
                <h1>Hello!</h1>
                <h2 style="color: dodgerblue">Follow the link bellow to begin test:</h2>
                <a href="http://recruiter-dev.surge.sh/${code}">http://recruiter-dev.surge.sh/${code}</a>
                <br>
                <br>
                <a href="http://localhost:4200/${code}">http://localhost:4200/${code}</a>
                <br>
                <br>
                <h3>
                    Thanks!
                </h3>
                <h4>The screaming tool team</h4>
            `
        }
    }
};