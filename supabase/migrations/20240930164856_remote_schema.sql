CREATE TRIGGER create_profile_trigger AFTER INSERT ON auth.users FOR EACH ROW WHEN ((new.raw_user_meta_data IS NOT NULL)) EXECUTE FUNCTION create_profile();


