import React from 'react';
import './ProductDetailMom.css';
const ProductDetail = () => {
    return (
        <div>
            <section className="product_detail width-common">

                <div className="wrap">
                    <div className="des_detail css-content">
                        <div className="basic_info" id="basic_info">
                            <ul className="ul1 left">
                                <li>Hương vị Vanilla</li>
                            </ul>
                            <ul className="ul2 left">
                                <li>Nhập khẩu từ Úc</li>
                                <li>Trọng lượng: 850g</li>
                            </ul>
                            <div className="clear"></div>
                        </div>
                        <div className="product_des_detail" id="detail">
                            <h2>Mô tả Sữa Ensure Úc vị Vanilla 850g</h2>
                            <p style={{ textAlign: 'justify' }}>
                                <strong>Sữa Ensure Úc vị Vanilla 850g</strong> là một thức uống dinh dưỡng chất lượng cao cho những người cần thêm dinh dưỡng. ENSURE chứa các nhu cầu dinh dưỡng cần thiết bao gồm các carbohydrate, protein, 15 vitamin và 14 khoáng chất, thích hợp làm nguồn dinh dưỡng chính cho người đang dưỡng bệnh hay nguồn dinh dưỡng bổ sung cho các bữa ăn hàng ngày. Với ENSURE bạn có thể chắc chắn mình đang có những gì tốt nhất mà khoa học dinh dưỡng mang đến.
                            </p>
                            <h3 style={{ textAlign: 'justify' }}>
                                <span style={{ fontSize: '16px' }}>Thông tin chi tiết của sữa Ensure Úc vị Vanilla 850g</span>
                            </h3>
                            <p><strong>- Sữa Ensure Úc</strong> chứa chất chống oxy hóa và giúp tăng cường hệ thống miễn dịch tự nhiên của cơ thể</p>
                            <p><strong>- </strong>Sữa<strong> </strong>không chứa đường Lactose gluten, cung cấp một nguồn dinh dưỡng đầy đủ và cân bằng cho người sử dụng.</p>
                            <p>- Sữa Ensure Úc thích hợp cho người lớn, người ăn uống kém, người bệnh hoặc cho người cần phục hồi nhanh và phụ nữ trong thời kỳ mang thai.</p>
                            <p>- Sữa Ensure Úc cung cấp 24 loại vitamin và khoáng chất thiết yếu, các axit béo, hàm lượng axít béo no và cholesterol thấp</p>
                            <p>- Sữa Ensure Úc có thể được sử dụng để bổ sung vào khẩu phần ăn khi có nhu cầu tăng thêm về năng lượng và chất đạm hoặc để duy trì tình trạng dinh dưỡng tốt.</p>
                            <p>- Ngoài ra <strong>Sữa Ensure Úc</strong> còn được dùng để thay thế hoàn toàn hay một phần bữa ăn để duy trì hoặc tăng cường sức khoẻ.</p>
                            <p><strong>Cách pha:</strong></p>
                            <p>- Để pha 250 ml : cho 210 ml nước chín để nguội vào ly.</p>
                            <p>- Vừa từ từ cho vào ly 6 muỗng gạt ngang (muỗng có sẵn trong hộp) hay 55,8 g bột Ensure</p>
                            <p>- Vừa khuấy đều cho tan hết. Khi pha đúng theo hướng dẫn, 1 ml Ensure cung cấp 1 kcal.</p>
                            <p>- Một hộp Ensure 400 g pha được khoảng 7 ly, mỗi ly 250 ml.</p>
                            <p>- Có thể thêm vào so co la, trái cây, đậu phộng... để có hương vị thơm ngon theo ý thích.</p>
                            <p style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '18px', color: 'rgb(255, 0, 0)' }}><strong>“SPECIALLY FORMULATED” – “CÔNG THỨC ĐẶC BIỆT” và “FOS PREBIOTICS INULIN” :</strong></span>
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                ENSURE được công thức đặc biệt với chất béo tốt cho tim mạch, cung cấp các axit béo cần thiết, hàm lượng chất béo bão hòa và cholesterol thấp. ENSURE cũng chứa Fructo-oligosaccharides (FOS) hỗ trợ hệ tiêu hóa khỏe mạnh, một yếu tố quan trọng cấu thành hệ miễn dịch. ENSURE đã tăng cường lợi ích của việc pha trộn FOS và Inulin (sợi prebiotic hòa tan) giúp hấp thụ canxi tốt hơn.
                            </p>
                        </div>
                        <div className="brand">
                            <div className="name_brand">
                                <a href="/thuong-hieu/ensure">Thương hiệu : Ensure</a>
                            </div>
                            <blockquote cite="/thuong-hieu/ensure">
                                <div className="detail_brand">
                                    <img src="https://media.shoptretho.com.vn/upload/image/provider/20230421/logo-ensure.jpg" alt="Ensure" />
                                    <div id="provider-summary">
                                        Sữa Ensure là dòng sản phẩm dinh dưỡng y học cao năng lượng của hãng Abbott, với nhiều ưu điểm vượt trội phù hợp với người cao tuổi, người suy nhược cơ thể, kém ăn, gầy ốm, …
                                    </div>
                                </div>
                            </blockquote>
                            <div style={{ clear: 'both' }}></div>
                        </div>
                        <div id="review">
                            <div className="title_comment">Bình luận đánh giá sản phẩm</div>
                            <div className="review_detail">
                                {/* Form bình luận */}
                                <form action="/Product/AddComment" data-ajax="true" data-ajax-begin="ShowLoading($(&#39;#commentform&#39;), &#39;fix&#39;);" data-ajax-method="POST" data-ajax-success="HideLoading($(&#39;#commentform&#39;));ProcessComment(data)" id="commentform" method="post">
                                    <textarea cols="30" id="cmt_content" name="Content" rows="4"></textarea>
                                    <div className="comment_submit">
                                        <div className="btn_submit">
                                            <a id="btn_cmt" >Gửi</a>
                                        </div>
                                    </div>
                                    <div className="comment-popup">
                                        <div className="txt_info">
                                            THÔNG TIN NGƯỜI GỬI
                                            <a href="javascript:;" id="btn_close"><i className="fa fa-times"></i></a>
                                        </div>
                                        <div className="form_info">
                                            <div id="divStar">
                                                <div className="rating-stars text-center">
                                                    <ul id="stars">
                                                        <li className="star selected" title="Poor" data-value="1"><i className="fa fa-star fa-fw"></i></li>
                                                        <li className="star selected" title="Fair" data-value="2"><i className="fa fa-star fa-fw"></i></li>
                                                        <li className="star selected" title="Good" data-value="3"><i className="fa fa-star fa-fw"></i></li>
                                                        <li className="star selected" title="Excellent" data-value="4"><i className="fa fa-star fa-fw"></i></li>
                                                        <li className="star selected" title="WOW!!!" data-value="5"><i className="fa fa-star fa-fw"></i></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="cgd">
                                                <input value="5" data-val="true" data-val-number="The field Star must be a number." data-val-required="The Star field is required." id="commentStar" name="Star" type="hidden" value="0" />
                                                <input id="commentProductId" name="ProductId" type="hidden" value="85537835" />
                                                <input data-val="true" data-val-required="Bạn phải nhập Họ tên" id="commentCustomerName" name="CustomerName" placeholder="Họ tên ( bắt buộc)" type="text" value="" />
                                                <span className="field-validation-valid" data-valmsg-for="CustomerName" data-valmsg-replace="true"></span>
                                                <input data-val="true" data-val-regex="Số điện thoại không đúng" data-val-regex-pattern="^([0-9]+)$" data-val-required="Bạn phải nhập Số điện thoại" id="commentPhone" name="Phone" placeholder="Điện thoại ( bắt buộc)" type="text" value="" />
                                                <span className="field-validation-valid" data-valmsg-for="Phone" data-valmsg-replace="true"></span>
                                                <input id="commentEmail" name="Email" placeholder="Email ( không bắt buộc)" type="text" value="" />
                                                <span className="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true"></span>
                                            </div>
                                        </div>
                                        <div className="comment_submit">
                                            <div className="btn_submit">
                                                <a href="javascript:;" >Gửi bình luận</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="list_comment">
                                {/* Render các comment ở đây */}
                            </div>
                        </div>
                    </div>
                    <div id="buy_online">
                        <div className="other_buy">
                            <a href="tel:18006066" className="buy-fast"></a>
                            <a href="/huong-dan-mua-online" className="buy-online"></a>
                            <a href="/huong-dan-mua-tra-gop" className="buy-purchasenow"></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
