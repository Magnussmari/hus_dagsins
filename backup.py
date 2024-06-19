import os
import shutil
from datetime import datetime

def backup_database():
    src = 'houses.db'
    dst = 'backup'

    if not os.path.exists(dst):
        os.makedirs(dst)

    # Dagsetningin fyrir afritaskrána
    date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(dst, f"houses_backup_{date_str}.db")

    # Afrita skrána í backup möppuna með dagsetningu
    shutil.copy(src, backup_file)

    print(f"Afrit staðfest: {backup_file}")

if __name__ == "__main__":
    backup_database()
