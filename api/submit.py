# api/submit.py
import json
import os
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler

BOT_TOKEN = os.environ.get("8722843993:AAE6rpHlAjKjg_E3QGXlv17WrQt2oizRM0o")
CHAT_ID = os.environ.get("1028237299")

def send_telegram_message(text: str):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = urllib.parse.urlencode({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML"
    }).encode("utf-8")

    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode("utf-8"))

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(body)

            name = data.get("name", "نامشخص")
            phone = data.get("phone", "نامشخص")
            message = data.get("message", "بدون پیام")
            accepted = data.get("accepted", "")
            first_name = data.get("firstName", "") or data.get("first_name", "")
            last_name = data.get("lastName", "") or data.get("last_name", "")
            interests = data.get("interests", "")
            selected_activity = data.get("selectedActivity", "")
            selected_day = data.get("selectedDay", "")
            selected_time = data.get("selectedTime", "")
            instagram = data.get("instagram", "")
            telegram = data.get("telegram", "")

            telegram_text = (
                f"📩 <b>درخواست جدید ثبت شد</b>\n\n"
                f"👤 نام: {name}\n"
                f"📞 تلفن: {phone}\n"
                f"📝 پیام: {message}\n"
                f"✅ وضعیت: {accepted}\n"
                f"🧑‍🤝‍🧑 نام اول: {first_name}\n"
                f"🧑‍🤝‍🧑 نام خانوادگی: {last_name}\n"
                f"🎯 علاقه‌ها: {interests}\n"
                f"🎲 فعالیت: {selected_activity}\n"
                f"📅 روز: {selected_day}\n"
                f"🕒 زمان: {selected_time}\n"
                f"📸 اینستاگرام: {instagram}\n"
                f"✉️ تلگرام: {telegram}"
            )

            result = send_telegram_message(telegram_text)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            self.wfile.write(json.dumps({
                "success": True,
                "telegram_result": result
            }).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            self.wfile.write(json.dumps({
                "success": False,
                "error": str(e)
            }).encode("utf-8"))
