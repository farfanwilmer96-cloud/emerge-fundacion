#!/usr/bin/env python3
"""
Backend API Testing for Funda Crecer
Tests all API endpoints according to the review request
"""

import requests
import json
import re
from datetime import datetime
import xml.etree.ElementTree as ET

BASE_URL = "https://crecer-headless-core.preview.emergentagent.com"
API_URL = f"{BASE_URL}/api"

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}\n")

def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} - {name}")
    if details:
        print(f"   {details}")

def is_valid_uuid(uuid_string):
    """Check if string is a valid UUID"""
    uuid_pattern = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', re.IGNORECASE)
    return bool(uuid_pattern.match(uuid_string))

def is_valid_iso_date(date_string):
    """Check if string is a valid ISO date"""
    try:
        datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return True
    except:
        return False

# ============================================================
# TEST 1: Health Endpoint
# ============================================================
def test_health_endpoint():
    print_section("TEST 1: Health Endpoint (GET /api/)")
    
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check required fields
            has_ok = data.get('ok') == True
            has_service = data.get('service') == 'Funda Crecer API'
            has_time = 'time' in data and is_valid_iso_date(data['time'])
            
            print_test("Status 200", True)
            print_test("Has 'ok: true'", has_ok, f"ok={data.get('ok')}")
            print_test("Has correct service name", has_service, f"service={data.get('service')}")
            print_test("Has valid ISO time", has_time, f"time={data.get('time')}")
            
            return has_ok and has_service and has_time
        else:
            print_test("Health endpoint", False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test("Health endpoint", False, f"Exception: {str(e)}")
        return False

# ============================================================
# TEST 2: Contact Form API
# ============================================================
def test_contact_api():
    print_section("TEST 2: Contact Form API (POST /api/contact)")
    
    all_passed = True
    created_contacts = []
    
    # Test 2.1: Valid contact submission
    try:
        valid_contact = {
            "name": "María González",
            "email": "maria.gonzalez@example.com",
            "phone": "+54 11 1234-5678",
            "message": "Me gustaría saber más sobre los programas de voluntariado disponibles."
        }
        
        response = requests.post(f"{API_URL}/contact", json=valid_contact, timeout=10)
        print(f"\n2.1 Valid Contact Submission")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            contact = data.get('contact', {})
            
            # Validate response structure
            has_ok = data.get('ok') == True
            has_id = 'id' in contact and is_valid_uuid(contact['id'])
            has_name = contact.get('name') == valid_contact['name']
            has_email = contact.get('email') == valid_contact['email']
            has_phone = contact.get('phone') == valid_contact['phone']
            has_message = contact.get('message') == valid_contact['message']
            has_created_at = 'created_at' in contact and is_valid_iso_date(contact['created_at'])
            
            print_test("Status 201", True)
            print_test("Has 'ok: true'", has_ok)
            print_test("Has valid UUID", has_id, f"id={contact.get('id')}")
            print_test("Name matches", has_name)
            print_test("Email matches", has_email)
            print_test("Phone matches", has_phone)
            print_test("Message matches", has_message)
            print_test("Has valid created_at", has_created_at, f"created_at={contact.get('created_at')}")
            
            if has_id:
                created_contacts.append(contact['id'])
            
            all_passed = all_passed and has_ok and has_id and has_name and has_email and has_created_at
        else:
            print_test("Valid contact submission", False, f"Expected 201, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Valid contact submission", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 2.2: Missing required fields (no name)
    try:
        invalid_contact = {
            "email": "test@example.com",
            "message": "Test message"
        }
        
        response = requests.post(f"{API_URL}/contact", json=invalid_contact, timeout=10)
        print(f"\n2.2 Missing Name Field")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            has_error = 'error' in data
            print_test("Status 400 for missing name", True)
            print_test("Has error message", has_error, f"error={data.get('error')}")
            all_passed = all_passed and has_error
        else:
            print_test("Missing name validation", False, f"Expected 400, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Missing name validation", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 2.3: Missing email
    try:
        invalid_contact = {
            "name": "Test User",
            "message": "Test message"
        }
        
        response = requests.post(f"{API_URL}/contact", json=invalid_contact, timeout=10)
        print(f"\n2.3 Missing Email Field")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            print_test("Status 400 for missing email", True)
        else:
            print_test("Missing email validation", False, f"Expected 400, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Missing email validation", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 2.4: Missing message
    try:
        invalid_contact = {
            "name": "Test User",
            "email": "test@example.com"
        }
        
        response = requests.post(f"{API_URL}/contact", json=invalid_contact, timeout=10)
        print(f"\n2.4 Missing Message Field")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            print_test("Status 400 for missing message", True)
        else:
            print_test("Missing message validation", False, f"Expected 400, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Missing message validation", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 2.5: Create additional contacts for list test
    try:
        print(f"\n2.5 Creating Additional Contacts")
        
        contacts_to_create = [
            {
                "name": "Juan Pérez",
                "email": "juan.perez@example.com",
                "phone": "+54 11 9876-5432",
                "message": "Quisiera hacer una donación para el proyecto de educación."
            },
            {
                "name": "Ana Martínez",
                "email": "ana.martinez@example.com",
                "phone": "",
                "message": "¿Cómo puedo participar en las actividades comunitarias?"
            }
        ]
        
        for idx, contact_data in enumerate(contacts_to_create, 1):
            response = requests.post(f"{API_URL}/contact", json=contact_data, timeout=10)
            if response.status_code == 201:
                data = response.json()
                contact_id = data.get('contact', {}).get('id')
                if contact_id:
                    created_contacts.append(contact_id)
                print_test(f"Contact {idx} created", True, f"id={contact_id}")
            else:
                print_test(f"Contact {idx} created", False, f"Status {response.status_code}")
                all_passed = False
                
    except Exception as e:
        print_test("Creating additional contacts", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 2.6: GET /api/contact - List all contacts
    try:
        print(f"\n2.6 GET /api/contact - List Contacts")
        
        response = requests.get(f"{API_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            contacts = data.get('contacts', [])
            
            print_test("Status 200", True)
            print_test("Has contacts array", 'contacts' in data)
            print_test("Contacts count", len(contacts) >= 3, f"Found {len(contacts)} contacts")
            
            # Check if sorted by created_at DESC
            if len(contacts) >= 2:
                dates = [c.get('created_at') for c in contacts if 'created_at' in c]
                is_sorted = all(dates[i] >= dates[i+1] for i in range(len(dates)-1))
                print_test("Sorted by created_at DESC", is_sorted)
                all_passed = all_passed and is_sorted
            
            # Verify our created contacts are in the list
            contact_ids = [c.get('id') for c in contacts]
            for created_id in created_contacts:
                found = created_id in contact_ids
                print_test(f"Contact {created_id[:8]}... in list", found)
                all_passed = all_passed and found
                
        else:
            print_test("GET contacts list", False, f"Expected 200, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("GET contacts list", False, f"Exception: {str(e)}")
        all_passed = False
    
    return all_passed

# ============================================================
# TEST 3: News API (Legacy MongoDB)
# ============================================================
def test_news_api():
    print_section("TEST 3: News API (Legacy MongoDB)")
    
    all_passed = True
    created_news = []
    
    # Test 3.1: GET /api/news - Initial list
    try:
        print(f"\n3.1 GET /api/news - Initial List")
        
        response = requests.get(f"{API_URL}/news", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            news_list = data.get('news', [])
            
            print_test("Status 200", True)
            print_test("Has 'news' array", 'news' in data)
            print(f"   Initial news count: {len(news_list)}")
            
        else:
            print_test("GET news list", False, f"Expected 200, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("GET news list", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 3.2: POST /api/news - Create news (missing title)
    try:
        print(f"\n3.2 POST /api/news - Missing Title")
        
        invalid_news = {
            "body": "Contenido de prueba"
        }
        
        response = requests.post(f"{API_URL}/news", json=invalid_news, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            data = response.json()
            print_test("Status 400 for missing title", True)
            print_test("Has error message", 'error' in data, f"error={data.get('error')}")
        else:
            print_test("Missing title validation", False, f"Expected 400, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Missing title validation", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 3.3: POST /api/news - Create news (missing body)
    try:
        print(f"\n3.3 POST /api/news - Missing Body")
        
        invalid_news = {
            "title": "Título de prueba"
        }
        
        response = requests.post(f"{API_URL}/news", json=invalid_news, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            print_test("Status 400 for missing body", True)
        else:
            print_test("Missing body validation", False, f"Expected 400, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Missing body validation", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 3.4: POST /api/news - Create valid news
    try:
        print(f"\n3.4 POST /api/news - Create Valid News")
        
        news_items = [
            {
                "title": "Nueva Biblioteca Comunitaria Inaugurada",
                "body": "Hoy inauguramos nuestra nueva biblioteca comunitaria con más de 500 libros donados por la comunidad. Este espacio será un punto de encuentro para el aprendizaje y la cultura.",
                "author": "Equipo Funda Crecer",
                "cover_image": "/images/biblioteca.jpg"
            },
            {
                "title": "Taller de Arte para Niños - Inscripciones Abiertas",
                "slug": "taller-arte-ninos-2025",
                "body": "Abrimos inscripciones para nuestro taller de arte destinado a niños de 6 a 12 años. Las clases serán todos los sábados de 10 a 12 hs.",
                "author": "María González"
            },
            {
                "title": "Campaña de Recolección de Alimentos",
                "body": "Durante todo el mes estaremos recolectando alimentos no perecederos para familias en situación de vulnerabilidad. Puntos de recolección en nuestras sedes.",
                "date": "2025-01-15"
            }
        ]
        
        for idx, news_data in enumerate(news_items, 1):
            response = requests.post(f"{API_URL}/news", json=news_data, timeout=10)
            print(f"\nNews {idx}: {news_data['title']}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 201:
                data = response.json()
                news = data.get('news', {})
                
                has_id = 'id' in news and is_valid_uuid(news['id'])
                has_slug = 'slug' in news and len(news['slug']) > 0
                has_title = news.get('title') == news_data['title']
                has_body = news.get('body') == news_data['body']
                has_created_at = 'created_at' in news and is_valid_iso_date(news['created_at'])
                
                print_test(f"Status 201", True)
                print_test(f"Has valid UUID", has_id, f"id={news.get('id')}")
                print_test(f"Has slug", has_slug, f"slug={news.get('slug')}")
                print_test(f"Title matches", has_title)
                print_test(f"Body matches", has_body)
                print_test(f"Has created_at", has_created_at)
                
                if has_id and has_slug:
                    created_news.append({
                        'id': news['id'],
                        'slug': news['slug'],
                        'title': news['title']
                    })
                
                all_passed = all_passed and has_id and has_slug and has_title and has_created_at
            else:
                print_test(f"Create news {idx}", False, f"Expected 201, got {response.status_code}")
                print(f"Response: {response.text}")
                all_passed = False
                
    except Exception as e:
        print_test("Create valid news", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 3.5: GET /api/news?limit=2
    try:
        print(f"\n3.5 GET /api/news?limit=2 - Test Limit Parameter")
        
        response = requests.get(f"{API_URL}/news?limit=2", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            news_list = data.get('news', [])
            
            print_test("Status 200", True)
            print_test("Respects limit parameter", len(news_list) <= 2, f"Returned {len(news_list)} items")
            
        else:
            print_test("GET news with limit", False, f"Expected 200, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("GET news with limit", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 3.6: GET /api/news/:slug - Get specific news by slug
    if created_news:
        try:
            print(f"\n3.6 GET /api/news/:slug - Get News by Slug")
            
            test_news = created_news[0]
            response = requests.get(f"{API_URL}/news/{test_news['slug']}", timeout=10)
            print(f"Testing slug: {test_news['slug']}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                news = data.get('news', {})
                
                matches_id = news.get('id') == test_news['id']
                matches_slug = news.get('slug') == test_news['slug']
                matches_title = news.get('title') == test_news['title']
                
                print_test("Status 200", True)
                print_test("ID matches", matches_id)
                print_test("Slug matches", matches_slug)
                print_test("Title matches", matches_title)
                
                all_passed = all_passed and matches_id and matches_slug
            else:
                print_test("GET news by slug", False, f"Expected 200, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_test("GET news by slug", False, f"Exception: {str(e)}")
            all_passed = False
    
    # Test 3.7: GET /api/news/:id - Get specific news by UUID
    if created_news:
        try:
            print(f"\n3.7 GET /api/news/:id - Get News by UUID")
            
            test_news = created_news[0]
            response = requests.get(f"{API_URL}/news/{test_news['id']}", timeout=10)
            print(f"Testing UUID: {test_news['id']}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                news = data.get('news', {})
                
                matches_id = news.get('id') == test_news['id']
                
                print_test("Status 200", True)
                print_test("ID matches", matches_id)
                
                all_passed = all_passed and matches_id
            else:
                print_test("GET news by UUID", False, f"Expected 200, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_test("GET news by UUID", False, f"Exception: {str(e)}")
            all_passed = False
    
    # Test 3.8: PUT /api/news/:id - Update news
    if created_news:
        try:
            print(f"\n3.8 PUT /api/news/:id - Update News")
            
            test_news = created_news[0]
            update_data = {
                "title": "Biblioteca Comunitaria - ACTUALIZADO",
                "author": "Director General"
            }
            
            response = requests.put(f"{API_URL}/news/{test_news['id']}", json=update_data, timeout=10)
            print(f"Updating news: {test_news['id']}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                news = data.get('news', {})
                
                title_updated = news.get('title') == update_data['title']
                author_updated = news.get('author') == update_data['author']
                has_updated_at = 'updated_at' in news
                
                print_test("Status 200", True)
                print_test("Title updated", title_updated, f"title={news.get('title')}")
                print_test("Author updated", author_updated, f"author={news.get('author')}")
                print_test("Has updated_at", has_updated_at)
                
                all_passed = all_passed and title_updated and author_updated
            else:
                print_test("Update news", False, f"Expected 200, got {response.status_code}")
                print(f"Response: {response.text}")
                all_passed = False
                
        except Exception as e:
            print_test("Update news", False, f"Exception: {str(e)}")
            all_passed = False
    
    # Test 3.9: DELETE /api/news/:id - Delete news
    if created_news:
        try:
            print(f"\n3.9 DELETE /api/news/:id - Delete News")
            
            test_news = created_news[-1]  # Delete the last one
            response = requests.delete(f"{API_URL}/news/{test_news['id']}", timeout=10)
            print(f"Deleting news: {test_news['id']}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                has_ok = data.get('ok') == True
                
                print_test("Status 200", True)
                print_test("Has 'ok: true'", has_ok)
                
                # Verify it's actually deleted
                verify_response = requests.get(f"{API_URL}/news/{test_news['id']}", timeout=10)
                is_deleted = verify_response.status_code == 404
                print_test("News actually deleted", is_deleted, f"GET returned {verify_response.status_code}")
                
                all_passed = all_passed and has_ok and is_deleted
            else:
                print_test("Delete news", False, f"Expected 200, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_test("Delete news", False, f"Exception: {str(e)}")
            all_passed = False
    
    return all_passed

# ============================================================
# TEST 4: Sitemap XML
# ============================================================
def test_sitemap():
    print_section("TEST 4: Sitemap XML (GET /sitemap.xml)")
    
    all_passed = True
    
    try:
        response = requests.get(f"{BASE_URL}/sitemap.xml", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('Content-Type')}")
        
        if response.status_code == 200:
            print_test("Status 200", True)
            
            # Check if it's XML
            content_type = response.headers.get('Content-Type', '')
            is_xml = 'xml' in content_type.lower() or response.text.strip().startswith('<?xml')
            print_test("Is XML format", is_xml, f"Content-Type: {content_type}")
            
            # Parse XML
            try:
                root = ET.fromstring(response.text)
                
                # Check namespace
                namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
                urls = root.findall('.//ns:url', namespace)
                
                print_test("Valid XML structure", True)
                print_test("URL count >= 11", len(urls) >= 11, f"Found {len(urls)} URLs")
                
                # Check for required static pages
                locs = [url.find('ns:loc', namespace).text for url in urls if url.find('ns:loc', namespace) is not None]
                
                required_pages = ['/', '/noticias', '/proyectos', '/faq', '/contacto']
                for page in required_pages:
                    found = any(page == loc.rstrip('/').replace(BASE_URL, '') or loc.endswith(page) for loc in locs)
                    print_test(f"Has {page} page", found)
                    all_passed = all_passed and found
                
                # Check for news URLs with /noticias/<slug> pattern
                news_urls = [loc for loc in locs if '/noticias/' in loc]
                print_test("Has news URLs", len(news_urls) > 0, f"Found {len(news_urls)} news URLs")
                
                # Verify news URLs have correct format
                if news_urls:
                    sample_url = news_urls[0]
                    correct_format = '/noticias/' in sample_url
                    print_test("News URLs use /noticias/<slug>", correct_format, f"Example: {sample_url}")
                
                # Check for project URLs
                project_urls = [loc for loc in locs if '/proyectos/' in loc]
                print_test("Has project URLs", len(project_urls) > 0, f"Found {len(project_urls)} project URLs")
                
                # Check URL structure (should have loc, lastModified, etc.)
                if urls:
                    first_url = urls[0]
                    has_loc = first_url.find('ns:loc', namespace) is not None
                    has_lastmod = first_url.find('ns:lastModified', namespace) is not None
                    has_changefreq = first_url.find('ns:changeFrequency', namespace) is not None
                    has_priority = first_url.find('ns:priority', namespace) is not None
                    
                    print_test("URLs have <loc>", has_loc)
                    print_test("URLs have <lastModified>", has_lastmod)
                    print_test("URLs have <changeFrequency>", has_changefreq)
                    print_test("URLs have <priority>", has_priority)
                
                all_passed = all_passed and len(urls) >= 11 and is_xml
                
            except ET.ParseError as e:
                print_test("XML parsing", False, f"Parse error: {str(e)}")
                print(f"Response preview: {response.text[:500]}")
                all_passed = False
                
        else:
            print_test("Sitemap endpoint", False, f"Expected 200, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Sitemap endpoint", False, f"Exception: {str(e)}")
        all_passed = False
    
    return all_passed

# ============================================================
# TEST 5: Decap CMS Static Files
# ============================================================
def test_decap_cms():
    print_section("TEST 5: Decap CMS Static Files")
    
    all_passed = True
    
    # Test 5.1: GET /admin - HTML page
    try:
        print(f"\n5.1 GET /admin - Admin Panel HTML")
        
        response = requests.get(f"{BASE_URL}/admin", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('Content-Type')}")
        
        if response.status_code == 200:
            print_test("Status 200", True)
            
            html = response.text
            
            # Check for HTML structure
            is_html = '<!DOCTYPE html>' in html or '<html' in html
            print_test("Is HTML", is_html)
            
            # Check for Decap CMS script
            has_decap_script = 'decap-cms.js' in html or 'decap-cms' in html
            print_test("Has decap-cms.js script", has_decap_script)
            
            # Check for config reference
            has_config = 'config.yml' in html
            print_test("References config.yml", has_config)
            
            # Check for Netlify Identity widget
            has_identity = 'netlify-identity' in html
            print_test("Has Netlify Identity widget", has_identity)
            
            all_passed = all_passed and is_html and has_decap_script
            
        else:
            print_test("Admin panel", False, f"Expected 200, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Admin panel", False, f"Exception: {str(e)}")
        all_passed = False
    
    # Test 5.2: GET /admin/config.yml - CMS Configuration
    try:
        print(f"\n5.2 GET /admin/config.yml - CMS Configuration")
        
        response = requests.get(f"{BASE_URL}/admin/config.yml", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('Content-Type')}")
        
        if response.status_code == 200:
            print_test("Status 200", True)
            
            config = response.text
            
            # Check for YAML structure
            is_yaml = 'backend:' in config or 'collections:' in config
            print_test("Is YAML format", is_yaml)
            
            # Check for 3 collections
            has_news = 'name: "news"' in config or 'name: news' in config
            has_projects = 'name: "projects"' in config or 'name: projects' in config
            has_faqs = 'name: "faqs"' in config or 'name: faqs' in config
            
            print_test("Has 'news' collection", has_news)
            print_test("Has 'projects' collection", has_projects)
            print_test("Has 'faqs' collection", has_faqs)
            
            # Check for backend configuration
            has_backend = 'backend:' in config
            print_test("Has backend config", has_backend)
            
            # Check for media folder config
            has_media = 'media_folder:' in config
            print_test("Has media_folder config", has_media)
            
            all_passed = all_passed and is_yaml and has_news and has_projects and has_faqs
            
        else:
            print_test("Config.yml", False, f"Expected 200, got {response.status_code}")
            all_passed = False
            
    except Exception as e:
        print_test("Config.yml", False, f"Exception: {str(e)}")
        all_passed = False
    
    return all_passed

# ============================================================
# MAIN TEST RUNNER
# ============================================================
def main():
    print("\n" + "="*60)
    print("  FUNDA CRECER - BACKEND API TEST SUITE")
    print("  Base URL:", BASE_URL)
    print("="*60)
    
    results = {}
    
    # Run all tests
    results['health'] = test_health_endpoint()
    results['contact'] = test_contact_api()
    results['news'] = test_news_api()
    results['sitemap'] = test_sitemap()
    results['decap_cms'] = test_decap_cms()
    
    # Summary
    print_section("TEST SUMMARY")
    
    print(f"Health Endpoint:     {'✅ PASS' if results['health'] else '❌ FAIL'}")
    print(f"Contact API:         {'✅ PASS' if results['contact'] else '❌ FAIL'}")
    print(f"News API (Legacy):   {'✅ PASS' if results['news'] else '❌ FAIL'}")
    print(f"Sitemap XML:         {'✅ PASS' if results['sitemap'] else '❌ FAIL'}")
    print(f"Decap CMS:           {'✅ PASS' if results['decap_cms'] else '❌ FAIL'}")
    
    total_passed = sum(1 for v in results.values() if v)
    total_tests = len(results)
    
    print(f"\nTotal: {total_passed}/{total_tests} test suites passed")
    
    if all(results.values()):
        print("\n🎉 ALL TESTS PASSED! 🎉")
        return 0
    else:
        print("\n⚠️  SOME TESTS FAILED")
        return 1

if __name__ == "__main__":
    exit(main())
